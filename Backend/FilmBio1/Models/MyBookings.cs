using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FilmBio1.Models
{
    public class MyBookings
    {
        public int tmdbid { get; set; }
        public string movieName { get; set; }
        public DateTime viewDate { get; set; }
        public string salong { get; set; }
    }
}