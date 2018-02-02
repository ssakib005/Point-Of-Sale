namespace PosSystem.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DbUpdated99 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.OperationSales", "SubTotalAmount", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.OperationSales", "SubTotalAmount");
        }
    }
}
