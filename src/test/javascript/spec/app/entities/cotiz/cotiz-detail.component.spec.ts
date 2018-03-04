/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { NdoumriMutuelleTestModule } from '../../../test.module';
import { CotizDetailComponent } from '../../../../../../main/webapp/app/entities/cotiz/cotiz-detail.component';
import { CotizService } from '../../../../../../main/webapp/app/entities/cotiz/cotiz.service';
import { Cotiz } from '../../../../../../main/webapp/app/entities/cotiz/cotiz.model';

describe('Component Tests', () => {

    describe('Cotiz Management Detail Component', () => {
        let comp: CotizDetailComponent;
        let fixture: ComponentFixture<CotizDetailComponent>;
        let service: CotizService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NdoumriMutuelleTestModule],
                declarations: [CotizDetailComponent],
                providers: [
                    CotizService
                ]
            })
            .overrideTemplate(CotizDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CotizDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CotizService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Cotiz(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cotiz).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
