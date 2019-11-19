using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using FilmBio1.Models;

namespace FilmBio1.Controllers
{
    public class visningarsController : ApiController
    {
        private FilmenRegistreringEntities22 db = new FilmenRegistreringEntities22();

        // GET: api/visningars
        public IQueryable<visningar> Getvisningars()
        {
            return db.visningar;
        }

        // GET: api/visningars/5
        [ResponseType(typeof(visningar))]
        public IHttpActionResult Getvisningar(int id)
        {
            visningar visningar = db.visningar.Find(id);
            if (visningar == null)
            {
                return NotFound();
            }

            return Ok(visningar);
        }

        // PUT: api/visningars/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putvisningar(int id, visningar visningar)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != visningar.id)
            {
                return BadRequest();
            }

            db.Entry(visningar).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!visningarExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/visningars
        [ResponseType(typeof(visningar))]
        public IHttpActionResult Postvisningar(visningar visningar)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.visningar.Add(visningar);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = visningar.id }, visningar);
        }

        // DELETE: api/visningars/5
        [ResponseType(typeof(visningar))]
        public IHttpActionResult Deletevisningar(int id)
        {
            visningar visningar = db.visningar.Find(id);
            if (visningar == null)
            {
                return NotFound();
            }

            db.visningar.Remove(visningar);
            db.SaveChanges();

            return Ok(visningar);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool visningarExists(int id)
        {
            return db.visningar.Count(e => e.id == id) > 0;
        }
    }
}