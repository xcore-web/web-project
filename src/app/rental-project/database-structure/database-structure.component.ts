import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-database-structure',
  templateUrl: './database-structure.component.html',
  styleUrls: ['./database-structure.component.scss']
})
export class DatabaseStructureComponent implements OnInit {

  categoriesTable =
    `
      CREATE TABLE [dbo].[Categories] (
        [CategoryId]  INT            IDENTITY (1, 1) NOT NULL,
        [Description] NVARCHAR (50) NULL,
        CONSTRAINT [PK_Categories] PRIMARY KEY CLUSTERED ([CategoryId] ASC)
      );
    `;

  customersTable =
    `
      CREATE TABLE [dbo].[Customers] (
        [CustomerId] INT            IDENTITY (1, 1) NOT NULL,
        [LastName]   NVARCHAR (100) NULL,
        [FirstName]  NVARCHAR (100) NULL,
        [Address]    NVARCHAR (125) NULL,
        CONSTRAINT [PK_Customers] PRIMARY KEY CLUSTERED ([CustomerId] ASC)
      );
    `;
  
  mediasTable =
    `
      CREATE TABLE [dbo].[Medias] (
        [MediaId]    INT            IDENTITY (1, 1) NOT NULL,
        [ItemTitle]  NVARCHAR (100) NULL,
        [CategoryId] INT            NOT NULL,
        CONSTRAINT [PK_Medias] PRIMARY KEY CLUSTERED ([MediaId] ASC),
        CONSTRAINT [FK_Medias_Categories_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Categories] ([CategoryId]) ON DELETE CASCADE
      );


      GO
      CREATE NONCLUSTERED INDEX [IX_Medias_CategoryId]
          ON [dbo].[Medias]([CategoryId] ASC);
    `;
  
  rentalsTable =
    `
      CREATE TABLE [dbo].[Rentals] (
        [RentalId]     INT  IDENTITY (1, 1) NOT NULL,
        [DateOfRental] DATE NOT NULL,
        [DueDate]      DATE NOT NULL,
        [CustomerId]   INT  NOT NULL,
        [MediaId]      INT  NOT NULL,
        CONSTRAINT [PK_Rentals] PRIMARY KEY CLUSTERED ([RentalId] ASC),
        CONSTRAINT [FK_Rentals_Customers_CustomerId] FOREIGN KEY ([CustomerId]) REFERENCES [dbo].[Customers] ([CustomerId]) ON DELETE CASCADE,
        CONSTRAINT [FK_Rentals_Medias_MediaId] FOREIGN KEY ([MediaId]) REFERENCES [dbo].[Medias] ([MediaId]) ON DELETE CASCADE
      );
        
        
      GO
      CREATE NONCLUSTERED INDEX [IX_Rentals_CustomerId]
          ON [dbo].[Rentals]([CustomerId] ASC);
        
        
      GO
      CREATE NONCLUSTERED INDEX [IX_Rentals_MediaId]
          ON [dbo].[Rentals]([MediaId] ASC);
    `;

  constructor() { }

  ngOnInit(): void {
  }

}
