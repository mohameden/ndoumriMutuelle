/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { NdoumriMutuelleTestModule } from '../../../test.module';
import { CotizDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/cotiz/cotiz-delete-dialog.component';
import { CotizService } from '../../../../../../main/webapp/app/entities/cotiz/cotiz.service';

describe('Component Tests', () => {

    describe('Cotiz Management Delete Component', () => {
        let comp: CotizDeleteDialogComponent;
        let fixture: ComponentFixture<CotizDeleteDialogComponent>;
        let service: CotizService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NdoumriMutuelleTestModule],
                declarations: [CotizDeleteDialogComponent],
                providers: [
                    CotizService
                ]
            })
            .overrideTemplate(CotizDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CotizDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CotizService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
