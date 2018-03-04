/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { NdoumriMutuelleTestModule } from '../../../test.module';
import { CotizMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/cotiz-my-suffix/cotiz-my-suffix-delete-dialog.component';
import { CotizMySuffixService } from '../../../../../../main/webapp/app/entities/cotiz-my-suffix/cotiz-my-suffix.service';

describe('Component Tests', () => {

    describe('CotizMySuffix Management Delete Component', () => {
        let comp: CotizMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CotizMySuffixDeleteDialogComponent>;
        let service: CotizMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NdoumriMutuelleTestModule],
                declarations: [CotizMySuffixDeleteDialogComponent],
                providers: [
                    CotizMySuffixService
                ]
            })
            .overrideTemplate(CotizMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CotizMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CotizMySuffixService);
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
