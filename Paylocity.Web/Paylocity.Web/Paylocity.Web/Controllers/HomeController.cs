using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Paylocity.Web.Controllers
{
    [AllowAnonymous]
    public class HomeController : Controller
    {

        [AllowAnonymous]
        public ActionResult Index()
        {
            return RedirectToAction("Instructions");
        }

        [AllowAnonymous]
        public ActionResult Instructions()
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
