/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NdoumriMutuelleTestModule } from '../../../test.module';
import { EngagementComponent } from '../../../../../../main/webapp/app/entities/engagement/engagement.component';
import { EngagementService } from '../../../../../../main/webapp/app/entities/engagement/engagement.service';
import { Engagement } from '../../../../../../main/webapp/app/entities/engagement/engagement.model';

describe('Component Tests', () => {

    describe('Engagement Management Component', () => {
        let comp: EngagementComponent;
        let fixture: ComponentFixture<EngagementComponent>;
        let service: EngagementService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NdoumriMutuelleTestModule],
                declarations: [EngagementComponent],
                providers: [
                    EngagementService
                ]
            })
            .overrideTemplate(EngagementComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EngagementComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EngagementService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Engagement(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.engagements[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
