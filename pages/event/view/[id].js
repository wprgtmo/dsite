import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import EventLayout from "../../../layouts/EventLayout";
import Head from "next/head";
import { Card, CardBody, CardFooter } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";

export default function View({ session }) {
  const router = useRouter();
  const [events, setEvents] = useState({});
  const [records, setRecords] = useState([]);

  const eventDate = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const cadena = start.toLocaleString('default', { weekday: 'long' }).toUpperCase() + ", " + start.getDate() + " " + start.toLocaleString('default', { month: 'long' }).toUpperCase() + " - " + end.getDate() + " " + end.toLocaleString('default', { month: 'long' }).toUpperCase();

    return cadena;
  };


  const fetchData = async () => {

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "accept-Language": "es-ES,es;",
        Authorization: `Bearer ${session.token}`,
      },
    };

    const url = `${
      process.env.NEXT_PUBLIC_API_URL
    }event/one_event/${router.query.id}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setEvents(data.data);
        setRecords(data.data.tourney);
      }
    } catch (errors) {
      console.log(errors);
      const { response } = errors;
      const { detail } = response.data;
      Swal.fire({
        title: "Cargando Evento",
        text: detail,
        icon: "error",
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    }
  };

  useEffect(() => {
    fetchData();
    console.log(events);
  }, []);


  return (
    <EventLayout session={session}>
      <Head>
        <link rel="shortcut icon" href="/domino.ico" />
        <title>Evento</title>
      </Head>
      <div
        className="card"
        style={{ border: "1px solid", borderColor: "#c7c7c7" }}
      >
          <div className="row pt-3 px-4">
              <span style={{color: "red"}}><b>{eventDate(events.startDate, events.endDate)}</b></span>
          </div>

          <div className="row pt-2 px-4">
            <h1
              style={{ fontSize: "24px", fontWeight: "600", color: "#012970" }}
            >
              {events.name}
            </h1>
          </div>

          <div className="row px-4" style={{fontSize: "14px"}}>
            <span className="mb-2 text-muted">{events.campus}, {events.city_name}</span>
          </div>

          <div className="row px-4">
            <hr></hr>
          </div>

          <div className="row pt-2 px-4">
            <div className="container-events">
              {records.map(({name, modality, summary, startDate}, idx)=>(
                <Card className="folder__card" key={idx}>
                  <div className="d-flex justify-content-between p-2">
                    <div className="d-flex flex-row align-items-center">
                      <div className="d-flex flex-column ms-2">
                        <span className="fw-bold">{name}</span>
                      </div>
                    </div>
                  </div>
                  <Image
                    alt="Events Image"
                    src={events.photo}
                    width={400}
                    height={400}
                    quality={50}
                    onClick={(e)=>{e.preventDefault(); handleClick(id)}}
                    priority
                    layout="intrinsic"
                  />

                  <CardBody>
                    <div className="col-12 pt-4">
                      <h6 className="mb-2 text-muted">{summary}</h6>
                    </div>
                    <div className="col-12 pt-2">
                        <span>Modalidad: </span>
                        <b>{modality}</b>
                    </div>
                    <div className="col-12 pt-2">
                        <span>Fecha: </span>
                        <b>{startDate}</b>
                    </div>
                  </CardBody>
                  <CardFooter style={{textAlign: "center"}}>
                    <button className="btn btn-primary btn-sm">
                      <i class="bi bi-envelope"></i>{" "}
                        Enviar Invitación
                    </button>    

                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

      </div>
    </EventLayout>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  return {
    props: {
      session,
    },
  };
};
