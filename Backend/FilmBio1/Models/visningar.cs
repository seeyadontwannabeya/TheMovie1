//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace FilmBio1.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class visningar
    {
        public int id { get; set; }
        public string movieDBId { get; set; }
        public string salong { get; set; }
        public Nullable<System.DateTime> tidpunkt { get; set; }
        public string movieName { get; set; }
        public Nullable<int> TotalSeats { get; set; }
        public Nullable<int> ReservedSeats { get; set; }
    }
}