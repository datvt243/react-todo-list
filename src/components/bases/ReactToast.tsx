import { Toast } from 'bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface iProps {
    id?: string;
    text: string;
}
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
function ReactToast({ id, text }: iProps, ref: React.ReactNode) {
    //
    const [toastsId, setToastsId] = useState(() => {
        return id ? id : createRandomId();
    });

    const [toastBootstrap, setToastBootstrap] = useState<{
        show: () => void;
        hide: () => void;
    } | null>(null);

    useEffect(() => {
        if (id) {
            setToastsId(id);
        }

        setToastBootstrap(() => {
            const toastElm: HTMLElement | null = document.getElementById(toastsId);
            return toastElm ? Toast.getOrCreateInstance(toastElm) : null;
        });

        /* const toastBootstrap = Toast.getOrCreateInstance(toastsId); */
    }, [id, toastsId]);

    useImperativeHandle(ref, () => {
        return {
            show(): void {
                handlerShow();
            },
            hide(): void {
                handlerClose();
            },
        };
    });

    function createRandomId(): string {
        return 'Toasts_' + uuidv4();
    }
    function handlerShow(): void {
        toastBootstrap?.show();
    }
    function handlerClose(): void {
        toastBootstrap?.hide();
    }

    return (
        <>
            <div className="toast-container position-fixed top-0 end-0 p-3">
                <div id={toastsId} className="toast text-bg-success" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <strong className="me-auto">Thông báo</strong>
                        <small>11 mins ago</small>
                        <span className="btn-close pointer" data-bs-dismiss="toast" aria-label="Close">
                            <FontAwesomeIcon icon={faXmark} className="text-danger" />
                        </span>
                    </div>
                    <div className="toast-body">{text}</div>
                </div>
            </div>
        </>
    );
}

export default forwardRef(ReactToast);
