using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Paylocity.Web.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult Paylocity()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult UnitTests()
        {
            return View();
        }
    }
}
