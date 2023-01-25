import { useNavigate } from "@solidjs/router";
import * as solid from "solid-js";

const Initializer: solid.Component = () => {
    const navigate = useNavigate();

    solid.onMount(() => navigate("/splash"));

    return (
        <div></div>
    )
}

export default Initializer;