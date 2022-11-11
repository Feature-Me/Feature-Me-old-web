import * as THREE from "three";
import { Font } from "three/examples/jsm/loaders/FontLoader"
import { fontTable, FPTable } from "Types/resources/fontResources"

class judgeTextObject {
    static judgeTable: fontTable = [
        { name: "stunning", label: "Stunning", color: "#e5e537" },
        { name: "glossy", label: "Glossy", color: "#1feaf4" },
        { name: "moderate", label: "Moderate", color: "#3dbf2a" },
        { name: "lost", label: "Lost", color: "#aaaaaa" }
    ]
    static timeTable: FPTable = {
        future: "#1f5ff4",
        past: "#f4751f"
    }
    tableData;
    geometry: THREE.ShapeGeometry;
    material: THREE.MeshStandardMaterial;
    mesh: THREE.Mesh;
    posX: number;
    parent: THREE.Object3D;
    constructor(text: string, posX: number, accuracy: number, font: Font, parent: THREE.Object3D) {
        this.tableData = judgeTextObject.judgeTable.find(t => t.name == text);
        this.posX = posX;
        this.geometry = new THREE.ShapeGeometry(font.generateShapes(this.tableData?.label || "", 0.25));
        this.material = new THREE.MeshStandardMaterial({ color: this.tableData?.color || "#ffffff" });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.parent = parent
        this.setTranslate();
        this.setPos();
    }
    setTranslate() {
        this.geometry.computeBoundingBox();
        if (this.geometry.boundingBox) {
            const xMid = - 0.5 * (this.geometry.boundingBox.max.x - this.geometry.boundingBox.min.x);
            this.geometry.translate(xMid, 0, 0);
        }
    }
    setPos() {
        this.mesh.position.set(this.posX, 0.2, -4);
        this.mesh.rotation.set(THREE.MathUtils.degToRad(-38), 0, 0)
    }
    add() {
        this.parent.add(this.mesh);
    }
}

export default judgeTextObject