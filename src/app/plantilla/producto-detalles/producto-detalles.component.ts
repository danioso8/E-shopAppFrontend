import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectableObservable } from 'rxjs';
import { ModeloCarrito } from 'src/app/modelos/carrito';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-producto-detalles',
  templateUrl: './producto-detalles.component.html',
  styleUrls: ['./producto-detalles.component.css'],
})
export class ProductoDetallesComponent implements OnInit {
  id: string = '';
  registroProducto: ModeloProducto | undefined;
  p_name: string = '';
  p_description: string = '';
  p_stock: number = 0;
  p_unitValue: number = 0;
  p_discount: string = '';
  p_vat: number = 0;
  p_total: number = 0;
  p_image: string = '';
  p_freeShipping: boolean = false;

  fgValidador: FormGroup = this.fb.group({
    cantidad: ['', [Validators.required]],
  });

  constructor(
    private productoServicio: ProductoService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.ObtenerDatosProducto();
  }

  ObtenerDatosProducto() {
    this.productoServicio
      .ObtenerRegistrosPorId(this.id)
      .subscribe((datos: ModeloProducto) => {
        this.registroProducto = datos;
        // console.log(datos);
        console.log(this.registroProducto);
        this.p_name = String(this.registroProducto.name);
        this.p_description = String(this.registroProducto.description);
        this.p_stock = Number(this.registroProducto.stock);
        this.p_unitValue = Number(this.registroProducto.unitValue);
        this.p_discount = String(this.registroProducto.discount);
        this.p_vat = Number(this.registroProducto.vat);
        this.p_total = Number(this.registroProducto.total);
        this.p_image = String(this.registroProducto.image);
        if (this.p_total > 70000) {
          this.p_freeShipping = true;
        } else {
          this.p_freeShipping = false;
        }
      });
  }

  AgregarCarrito() {
    alert('Producto Agregado');
    let cant = this.fgValidador.controls['cantidad'].value;
    if (cant === '') {
      cant = '1';
    }
    const datosCarrito: ModeloCarrito = {
      id: this.id,
      cantidad: cant,
    };

    let registros: ModeloCarrito[] = [];
    registros.push(datosCarrito);

    //tenemos que verificar si existe algun registro o no
    let datosVerificar: ModeloCarrito[] = [];
    datosVerificar = JSON.parse(<string>localStorage.getItem('carrito'));
    if (datosVerificar === null) {
      console.log('Datos Nulos');
      localStorage.setItem('carrito', JSON.stringify(registros));
    } else {
      console.log('Datos No Nulos');
      let isRegister: boolean = false;

      datosVerificar.forEach((element) => {
        if (element.id === datosCarrito.id) {
          isRegister = true;
          return;
        }
      });
      if (isRegister === false) {
        let newArray: ModeloCarrito[] = [];
        newArray = registros.concat(datosVerificar);
        console.log(newArray);
        localStorage.setItem('carrito', JSON.stringify(newArray));
      }
    }
  }
}
