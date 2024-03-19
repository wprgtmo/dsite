import Layout from "../../../../layouts/Layout";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import FederativeForm from "../../../../components/Federative/Form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../../AppContext";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditFederative() {   
    const {lang, token} = useAppContext();
    const router = useRouter();

    const id = router.query.id;

    const [formFields, setFormFields] = useState({
        profileId: {
            value: "",
            error: false,
            errorMessage: ''                  
        },
        username: {
            value: "",
            error: false,
            errorMessage: 'El Nombre de usuario es requerido.'                  
        },
        firstName: {
            value: "",
            error: false,
            errorMessage: 'El nombre de pila es requerido'                  
        },
        lastName: {
            value: "",
            error: false,
            errorMessage: ''                  
        },
        email: {
            value: "",
            error: false,
            errorMessage: ''                  
        },
        countryId: {
            value: "",
            error: false,
            errorMessage: 'El país de origen es requerido'                  
        },
        cityId: {
            value: "",
            error: false,
            errorMessage: 'La Ciudad es requerida'                  
        },
        photo: {
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
        const url = `${process.env.NEXT_PUBLIC_API_URL}profile/generic/eventadmon/${id}`;
        try {
            const { data } = await axios.get(url, config);
            if (data.success) {
                setFormFields({
                    profileId: {
                        ...formFields["profileId"],
                        value: data.data.id,
                    },
                    username: {
                        ...formFields["username"],
                        value: data.data.username,
                    },
                    firstName: {
                        ...formFields["firstName"],
                        value: data.data.first_name,
                    },
                    lastName: {
                        ...formFields["lastName"],
                        value: data.data.last_name,
                    },
                    email: {
                        ...formFields["email"],
                        value: data.data.email,
                    },
                    countryId: {
                        ...formFields["countryId"],
                        value: data.data.country_id,
                    },
                    cityId: {
                        ...formFields["cityId"],
                        value: data.data.city_id,
                    },
                    photo: {
                        ...formFields["photo"],
                        value: data.data.photo,
                    }
                })
            }
        } catch ({code, message, name, request}) {
            if (code === "ERR_NETWORK") {
              Swal.fire({
                title: "Editar Federativo",
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
                    title: "Editar Federativo",
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
        <Layout title={"Editar Federativo"}>

            <div
                className="card"
                style={{ border: "1px solid", borderColor: "#c7c7c7" }}
            >
                <div className="row pt-3 px-4">

                    <Breadcrumbs
                        breadcrumbs={[
                            { label: 'Federativos', href: '/federative' },
                            {
                                label: 'Editar Federativo',
                                href: `/federative/${id}/edit`,
                                active: true,
                            },
                        ]}
                    />

                    <FederativeForm formFields={formFields} setFormFields={setFormFields}/>

                </div>
            </div>

        </Layout>
    )
}