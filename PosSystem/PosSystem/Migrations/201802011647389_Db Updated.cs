namespace PosSystem.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DbUpdated : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PurchaseDetails", "Total", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.PurchaseDetails", "Total");
        }
    }
}
