using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using FilmBio1.LoginRegistration;
using FilmBio1.Models;
using FilmBio1.Visning;

namespace FilmBio1.Controllers
{
    [RoutePrefix("Api/bookings")]
    public class BookingsController : ApiController
    {
        private FilmenRegistreringEntities22 db = new FilmenRegistreringEntities22();

        // GET: api/Bookings
        public IQueryable<Booking> GetBookings()
        {
            return db.Booking;
        }

        // GET: api/Bookings/5
        [ResponseType(typeof(Booking))]
        public IHttpActionResult GetBooking(int id)
        {
            Booking booking = db.Booking.Find(id);
            if (booking == null)
            {
                return NotFound();
            }

            return Ok(booking);
        }

        // PUT: api/Bookings/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBooking(int id, Booking booking)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != booking.ID)
            {
                return BadRequest();
            }

            db.Entry(booking).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingExists(id))
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

        // POST: api/Bookings
        [ResponseType(typeof(Booking))]
        public object PostBooking(Booking booking)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }   

            var movieShow = db.visningar.Find(booking.visningsID);
            if (movieShow.TotalSeats < (movieShow.ReservedSeats + booking.Seats))
            {
                return BadRequest();
            }

            movieShow.ReservedSeats += booking.Seats;
            db.Booking.Add(booking);
            db.SaveChanges();

            return new Response
            { Status = "Success", Message = "SuccessFully Saved." };
        }

        // DELETE: api/Bookings/5
        [ResponseType(typeof(Booking))]
        public IHttpActionResult DeleteBooking(int id)
        {
            Booking booking = db.Booking.Find(id);
            if (booking == null)
            {
                return NotFound();
            }

            db.Booking.Remove(booking);
            db.SaveChanges();

            return Ok(booking);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookingExists(int id)
        {
            return db.Booking.Count(e => e.ID == id) > 0;
        }

        [Route("Visning")]
        [HttpPost]
        public List<Booking> Visning(VisningKlass visning)
        {
            var log = db.Booking.Where(x => x.Email.Equals(visning.Email)).ToList();

            //var bookingsInfo = new List<MyBookings>();
            //foreach(var visn in log)
            //{
            //    if(visn.tmdbID == db.) 
            //}
            

            if (log == null)
            {
                return null;
            }
            else
                return log;
        }
    }
}