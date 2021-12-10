import { Component, OnInit } from '@angular/core';
import { ModeloCarrito } from 'src/app/modelos/carrito';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css'],
})
export class CarritoComprasComponent implements OnInit {
  ListadoDeCarrito: ModeloCarrito[] = [];
  ListadoRegistros: ModeloProducto[] = [];
  constructor(private productoServicio: ProductoService) {}

  ngOnInit(): void {
    this.ObtenerListadoCarrito();
  }

  ObtenerListadoCarrito() {
    this.ListadoDeCarrito = JSON.parse(<string>localStorage.getItem('carrito'));

    this.ListadoDeCarrito.forEach((element) => {
      this.ObtenerRegistro(element);
    });

    console.log(this.ListadoRegistros);
  }

  ObtenerRegistro(dato: ModeloCarrito) {
    let idproducto = String(dato.id);

    this.productoServicio
      .ObtenerRegistrosPorId(idproducto)
      .subscribe((datos: ModeloProducto) => {
        this.ListadoRegistros.push(datos);
      });
  }
}
