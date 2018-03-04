/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NdoumriMutuelleTestModule } from '../../../test.module';
import { CotizMySuffixComponent } from '../../../../../../main/webapp/app/entities/cotiz-my-suffix/cotiz-my-suffix.component';
import { CotizMySuffixService } from '../../../../../../main/webapp/app/entities/cotiz-my-suffix/cotiz-my-suffix.service';
import { CotizMySuffix } from '../../../../../../main/webapp/app/entities/cotiz-my-suffix/cotiz-my-suffix.model';

describe('Component Tests', () => {

    describe('CotizMySuffix Management Component', () => {
        let comp: CotizMySuffixComponent;
        let fixture: ComponentFixture<CotizMySuffixComponent>;
        let service: CotizMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NdoumriMutuelleTestModule],
                declarations: [CotizMySuffixComponent],
                providers: [
                    CotizMySuffixService
                ]
            })
            .overrideTemplate(CotizMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CotizMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CotizMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CotizMySuffix(123)],
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
