import {
    DialogActions,
    TextField,
    Grid,
} from "@mui/material";
import { Formik } from "formik";
import ToastNotification from "../../utils/ToastNotification";
import ButtonSubmit from "../../utils/Button";
import { Icons } from "../../utils/Icons";
import { useState } from "react";
import type { Service } from "../../../@types/services";
import { additionalServicesInitialValues } from "../../../formConfig/services";
import { validationSchemaServices } from "../../../validation/services";
import { patchService, postService } from "../../../services/services.service";
interface Props {
    onClose: () => void;
    setFlag?: (flag: boolean) => void;
    flag?: boolean;
    service: Service | undefined;
}

export default function FormServices({
    service,
    onClose,
    flag,
    setFlag,
}: Props) {
    const [loading, setLoading] = useState(false);

    const handleCreateAdditionalService = async (v: any) => {

        const { data } = await postService(v);
        ToastNotification(
            `El servicio adicional ${data.name} se creó correctamente`,
            "success"
        );

    };

    const handleUpdateService = async (values: any) => {
        const data: Service = {
            ...values,
        };
      await patchService(data, service?.id as number);
        ToastNotification(
            `El servicio adicional ${values.name} se actualizó correctamente`,
            "success",
        );
    };

    return (
                <>

        <Formik
            enableReinitialize={true}
            initialValues={additionalServicesInitialValues(service)}
            validationSchema={validationSchemaServices}
            onSubmit={async (values, { setSubmitting }) => {
                setLoading(true);
                try {
                    const serviceAction = service?.id
                        ? handleUpdateService
                        : handleCreateAdditionalService;

                    await serviceAction(values);
                } catch (error) {
                } finally {
                    onClose();
                    setLoading(false);
                    setSubmitting(false);
                    if (setFlag) setFlag(!flag);
                }
            }}
        >
            {({
                handleSubmit,
                handleBlur,
                handleChange,
                values,
                errors,
                touched,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                margin="dense"
                                label="Nombre"
                                name="name"
                                variant="outlined"
                                type="text"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                error={Boolean(touched.name && errors.name)}
                                helperText={touched.name && errors.name}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                margin="dense"
                                label="Descripción"
                                name="description"
                                variant="outlined"
                                type="text"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.description}
                                error={Boolean(touched.description && errors.description)}
                                helperText={touched.description && errors.description}
                            />
                        </Grid>
                    </Grid>
                    <DialogActions sx={{ px: 0, pt: 2 }}>
                        <ButtonSubmit
                            text={service?.id ? "Actualizar" : "Agregar"}
                            icon={service?.id ? Icons.editWhite : Icons.addWhite}
                            loading={loading}
                        />
                    </DialogActions>
                </form>
            )}
        </Formik>
                </>

    );
}
