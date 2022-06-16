using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApi.Controllers
{
    public class NameController : Controller
    {
        // GET: Name
        public ActionResult Index()
        {
            return View();
        }

        // GET: Name/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Name/Create
        public ActionResult Create()
        {
            return View();
        }
    }
}
