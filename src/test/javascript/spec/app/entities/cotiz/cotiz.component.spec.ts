/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NdoumriMutuelleTestModule } from '../../../test.module';
import { CotizComponent } from '../../../../../../main/webapp/app/entities/cotiz/cotiz.component';
import { CotizService } from '../../../../../../main/webapp/app/entities/cotiz/cotiz.service';
import { Cotiz } from '../../../../../../main/webapp/app/entities/cotiz/cotiz.model';

describe('Component Tests', () => {

    describe('Cotiz Management Component', () => {
        let comp: CotizComponent;
        let fixture: ComponentFixture<CotizComponent>;
        let service: CotizService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NdoumriMutuelleTestModule],
                declarations: [CotizComponent],
                providers: [
                    CotizService
                ]
            })
            .overrideTemplate(CotizComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CotizComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CotizService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Cotiz(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cotizs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
