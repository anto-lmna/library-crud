const { createApp } = Vue;
createApp({
	data() {
		return {
			libros: [],

			url: 'https://antolamanna13.pythonanywhere.com/biblioteca',
			error: false,
			cargando: true,

			id: 0,
			titulo: '',
			autor: '',
			anio: 0,
			genero: '',
			editorial: '',
			estado: '',
			buscar: '',
		};
	},

	methods: {
		fetchData(url) {
			fetch(url)
				.then((response) => response.json())
				.then((data) => {
					this.libros = data;
					this.cargando = false;
				})
				.catch((err) => {
					console.error(err);
					this.error = true;
				});
		},

		searchData() {
			let buscar = { buscar: this.buscar };

			fetch('https://antolamanna13.pythonanywhere.com/biblioteca', {
				method: 'POST',
				body: JSON.stringify(buscar),
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((response) => response.json())
				.then((data) => {
					this.libros = data.filter((libro) =>
						libro.titulo.toLowerCase().includes(this.buscar.toLowerCase())
					);
					this.cargando = false;
				})
				.catch((err) => {
					console.error(err);
					this.error = true;
				});
		},
		// eliminar libro

		eliminar(libro) {
			const confirm = window.confirm(
				'¿Estas seguro que deseas eliminar el registro?'
			);
			if (confirm) {
				const url = this.url + '/' + libro;
				var options = {
					method: 'DELETE',
				};
				fetch(url, options)
					.then((res) => res.text())
					.then(() => {
						location.reload();
					});
			}
		},

		// grabar cambios

		grabar() {
			let libro = {
				titulo: this.titulo,
				autor: this.autor,
				anio: this.anio,
				genero: this.genero,
				editorial: this.editorial,
				estado: this.estado,
			};

			var options = {
				body: JSON.stringify(libro),
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				redirect: 'follow',
			};

			fetch(this.url, options)
				.then(function () {
					alert('Registro grabado!');
					window.location.href = 'biblioteca.html';
				})
				.catch((err) => {
					console.error(err);
					alert('Error al Grabar.');
				});
		},

		// filtrar busqueda

		searchData() {
			if (this.buscar === '') {
				this.libros = this.fetchData(this.url);
			} else {
				const busqueda = this.buscar.toLowerCase();
				this.libros = this.libros.filter((libro) => {
					return (
						libro.titulo.toLowerCase().includes(busqueda) ||
						libro.autor.toLowerCase().includes(busqueda) ||
						libro.genero.toLowerCase().includes(busqueda) ||
						libro.editorial.toLowerCase().includes(busqueda) ||
						libro.estado.toLowerCase().includes(busqueda)
					);
				});
			}
		},
	},

	created() {
		this.fetchData(this.url);
	},
}).mount('#app');
