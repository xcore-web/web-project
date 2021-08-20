using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using XCore.Contracts;
using XCore.Entities;

namespace XCore.Repository
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected XCoreDbContext XCoreDbContext;

        public RepositoryBase(XCoreDbContext xCoreDbContext) => this.XCoreDbContext = xCoreDbContext;

        public IQueryable<T> GetAll() => (IQueryable<T>)this.XCoreDbContext.Set<T>();

        public IQueryable<T> FindAll(bool trackChanges) => trackChanges ? (IQueryable<T>)this.XCoreDbContext.Set<T>() : this.XCoreDbContext.Set<T>().AsNoTracking<T>();

        public IQueryable<T> FindByCondition(
          Expression<Func<T, bool>> expression,
          bool trackChanges)
        {
            return trackChanges ? this.XCoreDbContext.Set<T>().Where<T>(expression) : this.XCoreDbContext.Set<T>().Where<T>(expression).AsNoTracking<T>();
        }

        public void Create(T entity) => this.XCoreDbContext.Set<T>().Add(entity);

        public void Update(T entity) => this.XCoreDbContext.Set<T>().Update(entity);

        public void Delete(T entity) => this.XCoreDbContext.Set<T>().Remove(entity);
    }
}
