/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { NdoumriMutuelleTestModule } from '../../../test.module';
import { EngagementMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/engagement-my-suffix/engagement-my-suffix-detail.component';
import { EngagementMySuffixService } from '../../../../../../main/webapp/app/entities/engagement-my-suffix/engagement-my-suffix.service';
import { EngagementMySuffix } from '../../../../../../main/webapp/app/entities/engagement-my-suffix/engagement-my-suffix.model';

describe('Component Tests', () => {

    describe('EngagementMySuffix Management Detail Component', () => {
        let comp: EngagementMySuffixDetailComponent;
        let fixture: ComponentFixture<EngagementMySuffixDetailComponent>;
        let service: EngagementMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NdoumriMutuelleTestModule],
                declarations: [EngagementMySuffixDetailComponent],
                providers: [
                    EngagementMySuffixService
                ]
            })
            .overrideTemplate(EngagementMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EngagementMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EngagementMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new EngagementMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.engagement).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
