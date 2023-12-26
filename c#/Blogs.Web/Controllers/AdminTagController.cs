using Blogs.Web.Data;
using Blogs.Web.Models.Domain;
using Blogs.Web.Models.ViewModel;
using Microsoft.AspNetCore.Mvc;

namespace Blogs.Web.Controllers
{
    public class AdminTagController : Controller
    {

        private readonly BlogsDBContext dbContext;

        public AdminTagController(BlogsDBContext dBContext)
        {
                dbContext = dBContext; 
        }

        [HttpGet]
        public IActionResult Add()
        {
            return View();
        }

        [HttpPost]
        [ActionName("Add")]
        public IActionResult SubmitTag(AddTagRequest req)
        {
            /*            var name = req.Name;
                        var displayName = req.DisplayName;*/
            var tag = new Tag
            {
                Name = req.Name,
                DisplayName = req.DisplayName
            };

            dbContext.Tags.Add(tag);
            dbContext.SaveChanges();

            return View("Add"); 
        }

    }
}
