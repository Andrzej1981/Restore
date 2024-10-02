using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails { Title = "This is a bad request" });
        }

        [HttpGet("unauthorized")]
        public ActionResult GetUnauthorize()
        {
            return Unauthorized();
        }

        [HttpGet("validation-error")]
        public ActionResult GetValidation()
        {
            ModelState.AddModelError("Problem 1", "Error first");
            ModelState.AddModelError("Problem 2", "Error second");
            return ValidationProblem();
        }

        [HttpGet("server-problem")]
        public ActionResult GetServerError()
        {
            throw new Exception("This is server problem !");
        }

    }
}