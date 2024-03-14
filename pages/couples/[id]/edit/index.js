import Layout from "../../../../layouts/Layout";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import PlayerForm from "../../../../components/Players/Form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../../AppContext";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditCouples() {   
    const {lang, token} = useAppContext();
    const router = useRouter();

    const id = router.query.id;

    const [formFields, setFormFields] = useState({
        id: {
            value: "",
            error: false,
            errorMessage: ''                  
        },
        name: {
            value: "",
            error: false,
            errorMessage: 'El Nombre del club es requerido.'                  
        },
        acronym: {
            value: "",
            error: false,
            errorMessage: 'Las siglas que identifican el club es requerido'                  
        },
        federationId: {
            value: "",
            error: false,
            errorMessage: 'Seleccione la federación del club'                  
        },
        logo: {
            value: "",
            error: false,
            errorMessage: ''                  
        }
    });

    const config = {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "accept-Language": lang,
          "Authorization": `Bearer ${token}`,
        },
    };
    
    const fetchData = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}club/one/${id}`;
        try {
            const { data } = await axios.get(url, config);
            if (data.success) {
                console.log(data.data.name);

                setFormFields({
                    id: {
                        value: data.data.id,
                        error: false,
                        errorMessage: ''                  
                    },
                    name: {
                        value: data.data.name,
                        error: false,
                        errorMessage: 'El Nombre de la Federación es requerido.'                  
                    },
                    // acronym: {
                    //     ...formFields["acronym"],
                    //     value: data.data.acronym
                    // },
                    federationId: {
                        value: data.data.country_id,
                        error: false,
                        errorMessage: 'Seleccione la federación del Club'                  
                    },
                    logo: {
                        value: data.data.logo,
                        error: false,
                        errorMessage: ''                  
                    }                                
                })
            }
        } catch ({code, message, name, request}) {
            if (code === "ERR_NETWORK") {
              Swal.fire({
                title: "Editar Jugador",
                text: "Error en su red, consulte a su proveedor de servicio",
                icon: "error",
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar",
              });
            } else {
              if (code === "ERR_BAD_REQUEST") {
                const {detail} = JSON.parse(request.response)
                Swal.fire({
                    title: "Editar Jugador",
                    text: detail,
                    icon: "error",
                    showCancelButton: false,
                    allowOutsideClick: false,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Aceptar",
                });  
              }
            }
        }
    };    

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);
    
    return (
        <Layout title={"Editar Jugador"}>

            <div
                className="card"
                style={{ border: "1px solid", borderColor: "#c7c7c7" }}
            >
                <div className="row pt-3 px-4">

                    <Breadcrumbs
                        breadcrumbs={[
                            { label: 'Jugadores', href: '/players' },
                            {
                                label: 'Editar Jugador',
                                href: `/players/${id}/edit`,
                                active: true,
                            },
                        ]}
                    />

                    <PlayerForm formFields={formFields} setFormFields={setFormFields}/>

                </div>
            </div>

        </Layout>
    )
}