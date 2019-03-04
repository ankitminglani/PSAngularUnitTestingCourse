import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";


describe('Hero Component',()=>{

    //Component Fixture of type Hero Component 
    let fixture:ComponentFixture<HeroComponent>;

    beforeEach(()=>{

        //Create a module with Hero component
        TestBed.configureTestingModule({
            declarations:[HeroComponent],
        
            // tell angular to not through an error if you encounter an unkonw attribute or unknown element
            //just ignore it
            schemas:[NO_ERRORS_SCHEMA] 
        })

        //Create the instance of the Hero component
        fixture = TestBed.createComponent(HeroComponent);
        
        //fixture.componentInstance is the instance of the Hero component and hold all the property and methods.

    });

    it('should set Hero property of Hero Component',()=>{

        //setting an hero property in the component instance created
        fixture.componentInstance.hero = {
            id:1,name:'Super Dude',strength:3
        };

        expect(fixture.componentInstance.hero.name).toBe('Super Dude');
    });

    it('should contain the name of hero in an anchor tag',()=>{

         //setting an hero property in the component instance created
         fixture.componentInstance.hero = {
            id:1,name:'Super Dude',strength:3
        };

        //fixture.nativeElement give the dom of the fixture/component just like plain old javascript
        //console.log(fixture.nativeElement);
        //expect(fixture.nativeElement.querySelector('a').textContent).toContain('Super Dude');
        //gives out error because the bindings were not done {{}}
        //change detection did not run so we will have to run it and then assert.

        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('a').textContent).toContain('Super Dude');
        
        //each dom node has a wrapping debug element node
        //fixture.debugElement.query(By.css('#a')).nativeElement.textContent === fixture.nativeElement.querySelector('a').textContent
        //By is imported from "@angular/platform-browser";

        //same assert as above
        //expect(fixture.debugElement.query(By.css('a')).nativeElement.textContent).toContain('Super Dude');
        
        //more things can be done with debugElement as compared to nativeElement
        //for example debug element can be used to access directives like routerLink inside the a tag
        //debug element can also give output of the parent component's instance ie
        //fixture.debugElement.componentInstance

    });

});