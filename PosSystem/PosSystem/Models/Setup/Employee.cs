using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Web;

namespace PosSystem.Models.Setup
{
    public class Employee
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public int BranchId { get; set; }
        public string BName { get; set; }
        [NotMapped]
        public Branch Branch { get; set; }

        public DateTime JoiningDate { get; set; }
        public byte[] Image { get; set; }
        public string ContactNo { get; set; }
        public string Email { get; set; }
        
        public string EmpName { get; set; }
        public int EmployeesId { get; set; }
        [NotMapped]
        public Employee Employees { get; set; }
        public string EmergencyContactNo { get; set; }
        public string Nid { get; set; }
        public string FatherName { get; set; }
        public string  MotherName { get; set; }
        public string PresentAddress { get; set; }
        public string PermanentAddress { get; set; }
        [NotMapped]
        public HttpPostedFileWrapper Img { get; set; }
    }
}