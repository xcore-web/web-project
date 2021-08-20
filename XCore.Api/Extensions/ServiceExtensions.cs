using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using XCore.Contracts;
using XCore.EmailService;
using XCore.Entities;
using XCore.Entities.Models;
using XCore.LoggerService;
using XCore.Repository;

namespace XCore.Api.Extensions
{
    public static class ServiceExtensions
    {
        // ~~~~~~~~~~~~~~~ Configure Cors ~~~~~~~~~~~~~~~ //
        public static void ConfigureCors(this IServiceCollection services) =>
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                    builder
                    .AllowAnyMethod()
                    .AllowCredentials()
                    .AllowAnyHeader()
                    .WithOrigins("https://localhost:4200")
                    .WithExposedHeaders("X-Pagination"));
            });


        // ~~~~~~~~~~~~~~~ Configure IIS ~~~~~~~~~~~~~~~ //
        public static void ConfigureIISIntegration(this IServiceCollection services) =>
            services.Configure<IISOptions>(options =>
            {

            });


        // ~~~~~~~~~~~~~~~ Configure Swagger ~~~~~~~~~~~~~~~ //
        public static void ConfigureSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "XCore.Api", Version = "v1" });
            });
        }


        // ~~~~~~~~~~~~~~~ Configure Logger ~~~~~~~~~~~~~~~ //
        public static void ConfigureLoggerService(this IServiceCollection services) =>
            services.AddScoped<ILoggerManager, LoggerManager>();


        // ~~~~~~~~~~~~~~~ Configure Sql ~~~~~~~~~~~~~~~ //
        public static void ConfigureSqlContext(this IServiceCollection services, IConfiguration configuration) =>
            services.AddDbContext<XCoreDbContext>(opts =>
                opts.UseSqlServer(configuration.GetConnectionString("sqlConnection"), b => b.MigrationsAssembly("XCore.Api")));


        // ~~~~~~~~~~~~~~~ Configure Identity ~~~~~~~~~~~~~~~ //
        public static void ConfigureIdentity(this IServiceCollection services)
        {
            services.AddIdentity<User, IdentityRole>(opt =>
            {
                opt.Password.RequiredLength = 8;
                opt.Password.RequireNonAlphanumeric = true;
                opt.Password.RequireUppercase = true;
                opt.Password.RequireLowercase = true;

                opt.User.RequireUniqueEmail = true;
            })
            .AddEntityFrameworkStores<XCoreDbContext>()
            .AddDefaultTokenProviders();
        }


        // ~~~~~~~~~~~~~~~ Configure Repository Manager ~~~~~~~~~~~~~~~ //
        public static void ConfigureRepositoryManager(this IServiceCollection services) =>
           services.AddScoped<IRepositoryManager, RepositoryManager>();


        // ~~~~~~~~~~~~~~~ Configure Jwt Authentication ~~~~~~~~~~~~~~~ //
        public static void ConfigureJwt(this IServiceCollection services, IConfiguration configuration)
        {
            var jwtSettings = configuration.GetSection("JwtSettings");
            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,

                    ValidIssuer = jwtSettings.GetSection("validIssuer").Value,
                    ValidAudience = jwtSettings.GetSection("validAudience").Value,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.GetSection("securityKey").Value))
                };
            });
        }


        // ~~~~~~~~~~~~~~~ Configure Email Service ~~~~~~~~~~~~~~~ //
        public static void ConfigureEmailSender(this IServiceCollection services, IConfiguration configuration)
        {
            var emailConfig = configuration
                .GetSection("EmailConfiguration")
                .Get<EmailConfiguration>();
            services.AddSingleton(emailConfig);
            services.AddScoped<IEmailSender, EmailSender>();
        }
    }
}
