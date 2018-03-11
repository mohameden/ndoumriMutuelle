/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { NdoumriMutuelleTestModule } from '../../../test.module';
import { EngagementDetailComponent } from '../../../../../../main/webapp/app/entities/engagement/engagement-detail.component';
import { EngagementService } from '../../../../../../main/webapp/app/entities/engagement/engagement.service';
import { Engagement } from '../../../../../../main/webapp/app/entities/engagement/engagement.model';

describe('Component Tests', () => {

    describe('Engagement Management Detail Component', () => {
        let comp: EngagementDetailComponent;
        let fixture: ComponentFixture<EngagementDetailComponent>;
        let service: EngagementService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NdoumriMutuelleTestModule],
                declarations: [EngagementDetailComponent],
                providers: [
                    EngagementService
                ]
            })
            .overrideTemplate(EngagementDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EngagementDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EngagementService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Engagement(123)
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
