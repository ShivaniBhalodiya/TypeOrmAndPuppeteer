import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Covid {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    Country: string

    @Column()
    TotalCases: string

    @Column()
    NewCases: string

    @Column()
    TotalDeaths: string

    @Column()
    NewDeaths: string

    @Column()
    TotalRecovered: string

    @Column()
    NewRecovered: string

    @Column()
    ActiveCases: string

    @Column()
    Serious: string

    @Column()
    TotCases: string

    @Column()
    TotalTests: string

    @Column()
    Testspop: string

    @Column()
    Population: string
}