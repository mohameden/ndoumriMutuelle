/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { NdoumriMutuelleTestModule } from '../../../test.module';
import { CotizDialogComponent } from '../../../../../../main/webapp/app/entities/cotiz/cotiz-dialog.component';
import { CotizService } from '../../../../../../main/webapp/app/entities/cotiz/cotiz.service';
import { Cotiz } from '../../../../../../main/webapp/app/entities/cotiz/cotiz.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { EngagementService } from '../../../../../../main/webapp/app/entities/engagement';

describe('Component Tests', () => {

    describe('Cotiz Management Dialog Component', () => {
        let comp: CotizDialogComponent;
        let fixture: ComponentFixture<CotizDialogComponent>;
        let service: CotizService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NdoumriMutuelleTestModule],
                declarations: [CotizDialogComponent],
                providers: [
                    UserService,
                    EngagementService,
                    CotizService
                ]
            })
            .overrideTemplate(CotizDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CotizDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CotizService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Cotiz(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cotiz = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cotizListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Cotiz();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cotiz = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cotizListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
