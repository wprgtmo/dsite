import Layout from "../../../layouts/Layout"
import Breadcrumbs from "../../../components/Breadcrumbs";
import FederativeForm from "../../../components/Federative/Form";
import { useState } from "react";

export default function CreateFederative() {
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

    return (
        <Layout title={"Crear Federativo"}>

            <div
                className="card"
                style={{ border: "1px solid", borderColor: "#c7c7c7" }}
            >
                <div className="row pt-3 px-4">

                    <Breadcrumbs
                        breadcrumbs={[
                            { label: 'Federativos', href: '/federative' },
                            {
                                label: 'Crear Federativo',
                                href: '/federative/create',
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