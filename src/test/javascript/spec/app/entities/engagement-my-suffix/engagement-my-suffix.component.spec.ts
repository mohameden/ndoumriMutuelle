/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NdoumriMutuelleTestModule } from '../../../test.module';
import { EngagementMySuffixComponent } from '../../../../../../main/webapp/app/entities/engagement-my-suffix/engagement-my-suffix.component';
import { EngagementMySuffixService } from '../../../../../../main/webapp/app/entities/engagement-my-suffix/engagement-my-suffix.service';
import { EngagementMySuffix } from '../../../../../../main/webapp/app/entities/engagement-my-suffix/engagement-my-suffix.model';

describe('Component Tests', () => {

    describe('EngagementMySuffix Management Component', () => {
        let comp: EngagementMySuffixComponent;
        let fixture: ComponentFixture<EngagementMySuffixComponent>;
        let service: EngagementMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NdoumriMutuelleTestModule],
                declarations: [EngagementMySuffixComponent],
                providers: [
                    EngagementMySuffixService
                ]
            })
            .overrideTemplate(EngagementMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EngagementMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EngagementMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new EngagementMySuffix(123)],
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
