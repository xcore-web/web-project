import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { FolderNode } from 'src/app/shared/_interfaces/folder-node.model';

const BACK_END_TREE_DATA: FolderNode[] = [
  {
    name: '(Solution) XCore',
    children: [
      {
        name: '(Api) XCore.Api',
        children: [
          {
            name: 'Properties',
            children: [
              { name: 'launchSettings.json' }
            ]
          },
          {
            name: 'Controllers',
            children: [
              { name: 'AccountsController.cs' },
              { name: 'ValuesController.cs' }
            ]
          },
          {
            name: 'Extensions',
            children: [
              { name: 'JwtHandler.cs' },
              { name: 'ServiceExtensions.cs' }
            ]
          },
          {
            name: 'internal_logs',
            children: [
              { name: 'internallog.txt' }
            ]
          },
          {
            name: 'Migrations',
            children: [
              { name: '20210503162308_InitialIdentityCreate.cs' },
              { name: 'XCoreDbContextModelSnapshot.cs' }
            ]
          },
          { name: 'appsettings.Development.json' },
          { name: 'appsettings.json' },
          { name: 'MappingProfile.cs' },
          { name: 'nlog.config' },
          { name: 'Program.cs' },
          { name: 'Statup.cs' }
        ]
      },
      {
        name: '(Class Library) XCore.Contracts',
        children: [
          { name: 'ILoggerManager.cs' },
          { name: 'IRepositoryBase.cs' },
          { name: 'IRepositoryManager.cs' }
        ]
      },
      {
        name: '(Class Library) XCore.EmailService',
        children: [
          { name: 'EmailConfiguration.cs' },
          { name: 'EmailSender.cs' },
          { name: 'IEmailSender.cs' },
          { name: 'Message.cs' }
        ]
      },
      {
        name: '(Class Library) XCore.Entities',
        children: [
          {
            name: 'Configurations',
            children: [
              { name: 'RoleConfiguration.cs' }
            ]
          },
          {
            name: 'DataTransferObjects',
            children: [
              {
                name: 'Users',
                children: [
                  { name: 'AuthResponseDto.cs' },
                  { name: 'ForgotPasswordDto.cs' },
                  { name: 'RegistrationResponseDto.cs' },
                  { name: 'ResetPasswordDto.cs' },
                  { name: 'UserForAuthenticationDto.cs' },
                  { name: 'UserForRegistrationDto.cs' }
                ]
              }
            ]
          },
          {
            name: 'Models',
            children: [
              { name: 'User.cs' }
            ]
          },
          { name: 'XCoreDbContext.cs' }
        ]
      },
      {
        name: '(Class Library) XCore.LoggerService',
        children: [
          { name: 'LoggerManager.cs' }
        ]
      },
      {
        name: '(Class Library) XCore.Repository',
        children: [
          { name: 'RepositoryBase.cs' },
          { name: 'RepositoryManager.cs' }
        ]
      }
    ]
  }
]

@Component({
  selector: 'app-back-end-tab-group',
  templateUrl: './back-end-tab-group.component.html',
  styleUrls: ['./back-end-tab-group.component.scss']
})
export class BackEndTabGroupComponent implements OnInit {

  treeControl = new NestedTreeControl<FolderNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<FolderNode>();

  identityModel =
  `public class User : IdentityUser
   {
      public string FirstName { get; set; }
      public string LastName { get; set; }
   }
  `;

  accountController =
  `
  [Route("api/accounts")]
  [ApiController]
  public class AccountsController : ControllerBase
  {
      private readonly UserManager<User> _userManager;
      private readonly IMapper _mapper;
      private readonly JwtHandler _jwtHandler;
      private readonly IEmailSender _emailSender;

      public AccountsController(UserManager<User> userManager, IMapper mapper, JwtHandler jwtHandler, IEmailSender emailSender)
      {
          _userManager = userManager;
          _mapper = mapper;
          _jwtHandler = jwtHandler;
          _emailSender = emailSender;
      }

      [HttpPost("Registration")]
      public async Task<IActionResult> RegisterUser([FromBody] UserForRegistrationDto userForRegistration)
      {
          if (userForRegistration == null || !ModelState.IsValid)
              return BadRequest();

          var user = _mapper.Map<User>(userForRegistration);

          var result = await _userManager.CreateAsync(user, userForRegistration.Password);
          if (!result.Succeeded)
          {
              var errors = result.Errors.Select(e => e.Description);

              return BadRequest(new RegistrationResponseDto { Errors = errors });
          }

          var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
          var param = new Dictionary<string, string>
          {
              {"token", token },
              {"email", user.Email }
          };

          var callback = QueryHelpers.AddQueryString(userForRegistration.ClientURI, param);

          var message = new Message(new string[] { "xcore.web.development@gmail.com" }, "Email Confirmation token", callback, null);
          await _emailSender.SendEmailAsync(message);

          await _userManager.AddToRoleAsync(user, "Viewer");

          return StatusCode(201);
      }

      [HttpPost("Login")]
      public async Task<IActionResult> Login([FromBody] UserForAuthenticationDto userForAuthentication)
      {
          var user = await _userManager.FindByNameAsync(userForAuthentication.Email);

          if (user == null)
              return BadRequest("Invalid Request");

          if (!await _userManager.IsEmailConfirmedAsync(user))
              return Unauthorized(new AuthResponseDto { ErrorMessage = "Email is not confirmed" });

          if (!await _userManager.CheckPasswordAsync(user, userForAuthentication.Password))
              return Unauthorized(new AuthResponseDto { ErrorMessage = "Invalid Authentication" });

          var signingCredentials = _jwtHandler.GetSigningCredentials();
          var claims = await _jwtHandler.GetClaims(user);
          var tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);
          var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

          return Ok(new AuthResponseDto { IsAuthSuccessful = true, Token = token });
      }

      [HttpPost("ForgotPassword")]
      public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
      {
          if (!ModelState.IsValid)
              return BadRequest();
          
          var user = await _userManager.FindByEmailAsync(forgotPasswordDto.Email);
          if (user == null)
              return BadRequest("Invalid Request");
          
          var token = await _userManager.GeneratePasswordResetTokenAsync(user);
          var param = new Dictionary<string, string>
              {
                  {"token", token },
                  {"email", forgotPasswordDto.Email }
              };

          var callback = QueryHelpers.AddQueryString(forgotPasswordDto.ClientURI, param);
         
          var message = new Message(new string[] { user.Email }, "Reset password token", callback, null);
          await _emailSender.SendEmailAsync(message);
          
          return Ok();
      }

      [HttpPost("ResetPassword")]
      public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
      {
          if (!ModelState.IsValid)
              return BadRequest();
          var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);
          if (user == null)
              return BadRequest("Invalid Request");
          var resetPassResult = await _userManager.ResetPasswordAsync(user, resetPasswordDto.Token, resetPasswordDto.Password);
          if (!resetPassResult.Succeeded)
          {
              var errors = resetPassResult.Errors.Select(e => e.Description);
              return BadRequest(new { Errors = errors });
          }
          return Ok();
      }

      [HttpGet("EmailConfirmation")]
      public async Task<IActionResult> EmailConfirmation([FromQuery] string email, [FromQuery] string token)
      {
          var user = await _userManager.FindByEmailAsync(email);
          if (user == null)
              return BadRequest("Invalid Email Confirmation Request");

          var confirmResult = await _userManager.ConfirmEmailAsync(user, token);
          if (!confirmResult.Succeeded)
              return BadRequest("Invalid Email Confirmation Request");

          return Ok();
      }
  }
  `;

  jwtToken =
    `
  public class JwtHandler
  {
      private readonly IConfiguration _configuration;
      private readonly IConfigurationSection _jwtSettings;
      private readonly UserManager<User> _userManager;

      public JwtHandler(IConfiguration configuration, UserManager<User> userManager)
      {
          _userManager = userManager;
          _configuration = configuration;
          _jwtSettings = _configuration.GetSection("JwtSettings");
      }

      public SigningCredentials GetSigningCredentials()
      {
          var key = Encoding.UTF8.GetBytes(_jwtSettings.GetSection("securityKey").Value);
          var secret = new SymmetricSecurityKey(key);
          return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
      }

      public async Task<List<Claim>> GetClaims(User user)
      {
          var claims = new List<Claim>
          {
              new Claim(ClaimTypes.Name, user.Email)
          };
          var roles = await _userManager.GetRolesAsync(user);
          foreach (var role in roles)
          {
              claims.Add(new Claim(ClaimTypes.Role, role));
          }
          return claims;
      }

      public JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
      {
          var tokenOptions = new JwtSecurityToken(
              issuer: _jwtSettings.GetSection("validIssuer").Value,
              audience: _jwtSettings.GetSection("validAudience").Value,
              claims: claims,
              expires: DateTime.Now.AddMinutes(Convert.ToDouble(_jwtSettings.GetSection("expiryInMinutes").Value)),
              signingCredentials: signingCredentials);
          return tokenOptions;
      }
  }
  `;

  loggerService =
    `
  public class LoggerManager : ILoggerManager
  {
      private static ILogger logger = LogManager.GetCurrentClassLogger();

      public LoggerManager()
      {
      }

      public void LogDebug(string message)
      {
          logger.Debug(message);
      }

      public void LogError(string message)
      {
          logger.Error(message);
      }

      public void LogInfo(string message)
      {
          logger.Info(message);
      }

      public void LogWarn(string message)
      {
          logger.Warn(message);
      }

  }
  `;

  constructor() {
    this.dataSource.data = BACK_END_TREE_DATA;
  }

  ngOnInit(): void {}

  hasChild = (_: number, node: FolderNode) => !!node.children ?? node.children.length;

}
