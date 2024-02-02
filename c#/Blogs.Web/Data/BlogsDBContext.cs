using Blogs.Web.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace Blogs.Web.Data
{
    public class BlogsDBContext : DbContext
    {
        public BlogsDBContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<BlogPost> BlogPosts { get; set; }
        public DbSet<Tag> Tags { get; set; }
    }
}
