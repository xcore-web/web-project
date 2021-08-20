using AutoMapper;
using XCore.Entities.DataTransferObjects.Categories;
using XCore.Entities.DataTransferObjects.Customers;
using XCore.Entities.DataTransferObjects.Medias;
using XCore.Entities.DataTransferObjects.Messages;
using XCore.Entities.DataTransferObjects.Rentals;
using XCore.Entities.DataTransferObjects.Users;
using XCore.Entities.Models;
using XCore.Entities.Models.Rentals;

namespace XCore.Api
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // ~~~~~~~~~~~~~~~ Map Customers ~~~~~~~~~~~~~~~ //
            CreateMap<Customer, CustomerDto>().ReverseMap();
            CreateMap<CustomerForCreationDto, Customer>();
            CreateMap<CustomerForUpdateDto, Customer>();

            // ~~~~~~~~~~~~~~~ Map Categories ~~~~~~~~~~~~~~~ //
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<CategoryForCreationDto, Category>();
            CreateMap<CategoryForUpdateDto, Category>();

            // ~~~~~~~~~~~~~~~ Map Medias ~~~~~~~~~~~~~~~ //
            CreateMap<Media, MediaDto>()
                .ForMember(x => x.Category, options => options.MapFrom(e => e.ItemCategory.Description));
            CreateMap<MediaForCreationDto, Media>();
            CreateMap<MediaForUpdateDto, Media>();

            // ~~~~~~~~~~~~~~~ Map Rentals ~~~~~~~~~~~~~~~ //
            CreateMap<Rental, RentalDto>()
                .ForMember(x => x.Customer, options => options.MapFrom(e => e.Customer.FirstName + ' '+ e.Customer.LastName))
                .ForMember(x => x.Media, options => options.MapFrom(e => e.Media.ItemTitle))
                .ForMember(x => x.Category, options => options.MapFrom(e => e.Media.ItemCategory.Description)); ;
            CreateMap<RentalForCreationDto, Rental>();
            CreateMap<RentalForUpdateDto, Rental>();


            // ~~~~~~~~~~~~~~~ Map Identity ~~~~~~~~~~~~~~~ //
            CreateMap<UserForRegistrationDto, User>();
            CreateMap<UserForAuthenticationDto, User>();

            // ~~~~~~~~~~~~~~~ Map Messages ~~~~~~~~~~~~~~~ //
            CreateMap<MessageItem, MessageDto>().ReverseMap();
            CreateMap<MessageCreationDto, MessageItem>();
        }
    }
}
