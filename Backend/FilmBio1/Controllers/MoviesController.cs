using FilmBio1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FilmBio1.Controllers
{
    [RoutePrefix("Api/Movies")]
    public class MoviesController : ApiController
    {
        FilmenRegistreringEntities22 DB = new FilmenRegistreringEntities22();

        [Route("GetMovieShows")]
        [HttpGet]
        public IHttpActionResult GetMovieShows()
        {
            List<visningar> movieShows = DB.visningar.ToList();
            return Ok(new { data = movieShows });
        }
    }
}
