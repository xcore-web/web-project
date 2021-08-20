using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using XCore.Contracts;
using XCore.Entities;
using XCore.Entities.Models.Rentals;

namespace XCore.Repository
{
    public class MediaRepository : RepositoryBase<Media>, IMediaRepository
    {
        public MediaRepository(XCoreDbContext xcoreDbContext)
          : base(xcoreDbContext)
        {
        }

        public async Task<IEnumerable<Media>> GetMediasAsync(bool trackChanges) => (IEnumerable<Media>)await this.FindAll(trackChanges).OrderBy<Media, string>((Expression<Func<Media, string>>)(c => c.ItemTitle)).Include<Media, Category>((Expression<Func<Media, Category>>)(c => c.ItemCategory)).ToListAsync<Media>();

        public async Task<Media> GetMediaAsync(int mediaId, bool trackChanges) => await this.FindByCondition((Expression<Func<Media, bool>>)(c => c.MediaId.Equals(mediaId)), (trackChanges ? 1 : 0) != 0).Include<Media, Category>((Expression<Func<Media, Category>>)(c => c.ItemCategory)).SingleOrDefaultAsync<Media>();

        public void CreateMedia(Media media) => this.Create(media);

        public void UpdateMedia(Media media) => this.Update(media);

        public void DeleteMedia(Media media) => this.Delete(media);
    }
}
