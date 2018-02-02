namespace PosSystem.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DbUpdated01 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.OperationSales", "SalesCode", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.OperationSales", "SalesCode");
        }
    }
}
