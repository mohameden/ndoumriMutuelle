/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { NdoumriMutuelleTestModule } from '../../../test.module';
import { EngagementDialogComponent } from '../../../../../../main/webapp/app/entities/engagement/engagement-dialog.component';
import { EngagementService } from '../../../../../../main/webapp/app/entities/engagement/engagement.service';
import { Engagement } from '../../../../../../main/webapp/app/entities/engagement/engagement.model';
import { CotizService } from '../../../../../../main/webapp/app/entities/cotiz';

describe('Component Tests', () => {

    describe('Engagement Management Dialog Component', () => {
        let comp: EngagementDialogComponent;
        let fixture: ComponentFixture<EngagementDialogComponent>;
        let service: EngagementService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NdoumriMutuelleTestModule],
                declarations: [EngagementDialogComponent],
                providers: [
                    CotizService,
                    EngagementService
                ]
            })
            .overrideTemplate(EngagementDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EngagementDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EngagementService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Engagement(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.engagement = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'engagementListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Engagement();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.engagement = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'engagementListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
