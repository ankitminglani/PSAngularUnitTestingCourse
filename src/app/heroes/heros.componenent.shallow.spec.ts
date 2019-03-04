import { HeroesComponent } from "./heroes.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA, Input, Component } from "@angular/core";
import { HeroService } from "../hero.service";
import { Hero } from "../hero";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";


describe("HerosComponent Shallow Test", () => {

    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROS: Hero[] = [];


    /******
     * Mocked Hero component
     */
    @Component({
        selector: 'app-hero',
        template: '<div></div>',
        //styleUrls: ['./hero.component.css']
    })
    class FakeHeroComponent {
        @Input() hero: Hero;
        // @Output() delete = new EventEmitter();
    }



    beforeEach(() => {

        let h1: Hero = new Hero();
        h1.id = 1;
        h1.name = 'hero1';
        h1.strength = 5;
        HEROS.push(h1);

        let h2: Hero = new Hero();
        h2.id = 2;
        h2.name = 'hero2';
        h2.strength = 10;
        HEROS.push(h2);

        let h3: Hero = new Hero();
        h3.id = 3;
        h3.name = 'hero3';
        h3.strength = 15;
        HEROS.push(h3);

        //create spy object for service with the named methods.
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'addHero']);


        TestBed.configureTestingModule({
            declarations: [HeroesComponent,
                //Mocked Child component
                FakeHeroComponent],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
                //if HeroService is asked by the provider then provide mockhHeroService instead
            ],

            // to avoid errors about the child component app-hero under HerosComponenet
            //schemas:[NO_ERRORS_SCHEMA] 
        });


        fixture = TestBed.createComponent(HeroesComponent);

        
    });

    it('should create same no of li elements on DOM', () => {

        console.log("2");
        mockHeroService.getHeroes.and.returnValue(of(HEROS));

        //detect changes is required to set property from the service##
        fixture.detectChanges();

        console.log(fixture.componentInstance.heroes.length);

        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);

    });

    it('should set heroes data from service', () => {

        console.log("1");
        mockHeroService.getHeroes.and.returnValue(of(HEROS));
        
        //detect changes is required to set property from the service##
        fixture.detectChanges();

        console.log(fixture.componentInstance.heroes.length);

        expect(fixture.componentInstance.heroes.length).toBe(3);
    });

});