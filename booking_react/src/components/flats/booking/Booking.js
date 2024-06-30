import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

export const Booking = (props) => {
  const navigate = useNavigate()
  const { show, onHide, free, range, flat, updateRange } = props

  const booking = async() => {
    console.log(sessionStorage.getItem("auth_token"))
    const formData = new FormData()
    formData.append('dates', range)
    formData.append('flat', flat.id)
    console.log(formData.get("dates"))

    const response = await fetch('http://127.0.0.1:8000/api/v1/booking/range/', {
      method: 'POST',  
      headers: {
          Authorization: `Token ${sessionStorage.getItem("auth_token")}`
        },
      body: formData
    })
    console.log(response.status)
    if (response.status === 200) {alert('Забронировано!'); updateRange()}
    if (response.status === 401) {alert('Пользователь не авторизован')}
    onHide()
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {free === "true" ? "Свободно!" : "Свободных мест нет"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Centered Modal</h4> */}
        <p>
          {free === "true" ?
            <span>Бронируем?</span> : 
            <span>В указанный период нет свободных мест. Вы можете выбрать другой период или поискать другие варианты размещения</span>
          }
        </p>
      </Modal.Body>
      <Modal.Footer>
        {free === "true" ? <Button onClick={booking}>Забронировать</Button> : 
          <div style={{display: 'flex', gap: "20px"}}>
            <Button onClick={onHide}>Изменить период</Button>
            <Button onClick={() => navigate("/")}>Выбрать другой вариант</Button>
          </div>
        }
        {/* <Button onClick={props.onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
}

// function App() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <Booking
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }
