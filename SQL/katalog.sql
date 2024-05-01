use master;
go
drop database if exists katalog;
go

create database katalog collate Croatian_CI_AS;
go

use katalog;

create table proizvodi(
sifra			int				not null primary key identity(1,1),
naziv			varchar(50)		not null,
tezina			int,
cijena			decimal(18,2), 
kategorija		int				not null);



create table kategorije(
sifra			int				not null primary key identity(1,1),
naziv			varchar(50)		not null,
vrijediod		datetime);



alter table proizvodi add foreign key (kategorija) references kategorije(sifra);



insert into kategorije (naziv, vrijediod) values

('flips','2017-10-15'),
('kokice','2017-10-01'),
('čips', '2018-01-12'),
('snack', '2021-05-20');

insert into proizvodi (kategorija, naziv,tezina,cijena) values
(1,'Kanaan flips s kikirikijem',50,0.39),
(1,'Kanaan flips s kokirikijem',80,0.69),
(2,'Kanaan kokice',125,0.80),
(3,'Kanaan čips slani',130,0.89),
(3,'Kanaan čips paprika',130,0.92),
(4,'Kanaan rice snack',50,0.63);


