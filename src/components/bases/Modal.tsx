import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface iProps {
    id: string;
    title: string;
    backdrop?: string;
    children?: React.ReactNode;
}
function Modal({ id, title = 'Chỉnh sửa', backdrop = 'static', children }: iProps) {
    return (
        <div
            className="modal fade"
            id={id}
            tabIndex="-1"
            data-bs-backdrop={backdrop || 'static'}
            data-bs-keyboard="false"
            aria-labelledby={`${id}Label`}
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <p className="modal-title fs-5" id={`${id}Label`}>
                            {title}
                        </p>
                        <span type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            <FontAwesomeIcon icon={faXmark} />
                        </span>
                    </div>
                    <div className="modal-body">{children}</div>
                    {/* <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Đóng
                        </button>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Modal;
