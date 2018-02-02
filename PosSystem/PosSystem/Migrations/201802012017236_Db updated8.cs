namespace PosSystem.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Dbupdated8 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SalesDetails", "Total", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.SalesDetails", "Total");
        }
    }
}
