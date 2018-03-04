/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { NdoumriMutuelleTestModule } from '../../../test.module';
import { CotizMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/cotiz-my-suffix/cotiz-my-suffix-detail.component';
import { CotizMySuffixService } from '../../../../../../main/webapp/app/entities/cotiz-my-suffix/cotiz-my-suffix.service';
import { CotizMySuffix } from '../../../../../../main/webapp/app/entities/cotiz-my-suffix/cotiz-my-suffix.model';

describe('Component Tests', () => {

    describe('CotizMySuffix Management Detail Component', () => {
        let comp: CotizMySuffixDetailComponent;
        let fixture: ComponentFixture<CotizMySuffixDetailComponent>;
        let service: CotizMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NdoumriMutuelleTestModule],
                declarations: [CotizMySuffixDetailComponent],
                providers: [
                    CotizMySuffixService
                ]
            })
            .overrideTemplate(CotizMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CotizMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CotizMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CotizMySuffix(123)
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
