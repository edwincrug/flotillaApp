registrationModule.controller('consultaController', ['$scope', function ($scope) {

               $scope.data = [
        {
            id: 1,
            type: 'folder', 
            icon: 'folder', 
            name: 'Vin: 1FBAX2CM0FKA56032',
            factura: 'AA000013433',
            estatus: 'Cargado',
            descripcion : 'CAMIONETA FORD TRANSIT 350 WAGON GASOLINA A/A Motor 3.7',
            estatusFrente: 'Cargado',
            imageFrente: '../images/auto_delantera.jpg',
            estatusDerecha:'Sin Documento',
            imageDerecha: '../images/auto_derecha.jpg',
            estatusTrasera: 'Pendiente',
            imageTrasera: '../images/auto_trasera.jpg',
            estatusIzquierda: 'Cargado',
            imageIzquierda:'../images/auto_izquierda.jpg'

        },
        {
            id: 2,
            type: 'folder',
            icon: 'folder', 
            name: 'VIN: 2GCBY3DN1GLB67143',
            factura: 'BB111124544',
            estatus: 'Sin Documento',
            descripcion: 'CAMION FORD F-150 XL SUPERCREW 4X2 3.5L V6 TA Motor V6',
            estatusFrente: 'Sin Documento',
            imageFrente: '../images/auto_delantera.jpg',
            estatusDerecha:'Pendiente',
            imageDerecha: '../images/auto_derecha.jpg',
            estatusTrasera: 'Cargado',
            imageTrasera: '../images/auto_trasera.jpg',
            estatusIzquierda: 'Sin Documento',
            imageIzquierda:'../images/auto_izquierda.jpg'
        },
        {
            id: 3,
            type: 'folder', 
            icon: 'folder', 
            name: 'VIN: 3HDCZ4EM2HMC78254',
            factura: 'CC222235655',
            estatus: 'Pendiente',
            descripcion: 'CAMION FORD F-150 XL CREWCAB 4X4 5.0L V8 Motor V8',
            estatusFrente: 'Pendiente',
            imageFrente: '../images/auto_delantera.jpg',
            estatusDerecha:'Cargado',
            imageDerecha: '../images/auto_derecha.jpg',
            estatusTrasera: 'Cargado',
            imageTrasera: '../images/auto_trasera.jpg',
            estatusIzquierda: 'Sin Documento',
            imageIzquierda:'../images/auto_izquierda.jpg'
        }
        /*{   type: 'picture', icon: 'image2', name: 'Image1' },
        {   type: 'picture', icon: 'image2', name: 'Image2' },
        {   type: 'picture', icon: 'image2', name: 'Image3' },
        {   type: 'picture', icon: 'image2', name: 'Image4' },
        {   type: 'picture', icon: 'image2', name: 'Image5' },
        {   type: 'picture', icon: 'file4', name: 'File 1' },
        {   type: 'picture', icon: 'file4', name: 'File 2' }*/
    ];

    $scope.settings = {
        theme: 'mobiscroll',
        enhance: true,
        actions: [
            {
                icon: 'camera',
                action: function (li, inst) {
                    notify('Linked');
                }
            },
            {
                icon: 'star3',
                action: function (li, inst) {
                    notify('Starred');
                }
            },
            {
                icon: 'remove',
                undo: true,
                action: function (li, inst) {
                    inst.remove(li);
                    return false;
                }
            },
            {
                icon: 'download',
                action: function (li, inst) {
                    notify('Downloaded');
                }
            },
        ],
        itemGroups: {
            folder: {
                actions: [
                    {
                        icon: 'link',
                        action: function (li, inst) {
                            notify('Linked');
                        }
                    },
                    {
                        icon: 'star3',
                        action: function (li, inst) {
                            notify('Starred');
                        }
                    },
                    {
                        icon: 'download',
                        action: function (li, inst) {
                            notify('Downloaded');
                        }
                    },
                ]
            },
            music: {
                actions: [
                    {
                        icon: 'link',
                        action: function (li, inst) {
                            notify('Linked');
                        }
                    },
                    {
                        icon: 'star3',
                        action: function (li, inst) {
                            notify('Starred');
                        }
                    },
                    {
                        icon: 'download',
                        action: function (li, inst) {
                            notify('Downloaded');
                        }
                    },
                    {
                        icon: 'play',
                        action: function (li, inst) {
                            notify('Playing...');
                        }
                    },
                    {
                        icon: 'remove',
                        undo: true,
                        action: function (li, inst) {
                            inst.remove(li);
                            return false;
                        }
                    }
                ]
            },
            movie: {
                actions: [
                    {
                        icon: 'link',
                        action: function (li, inst) {
                            notify('Linked');
                        }
                    },
                    {
                        icon: 'star3',
                        action: function (li, inst) {
                            notify('Starred');
                        }
                    },
                    {
                        icon: 'download',
                        action: function (li, inst) {
                            notify('Downloaded');
                        }
                    },
                    {
                        icon: 'play',
                        action: function (li, inst) {
                            notify('Playing...');
                        }
                    },
                    {
                        icon: 'remove',
                        undo: true,
                        action: function (li, inst) {
                            inst.remove(li);
                            return false;
                        }
                    }
                ]
            },
            picture:
            {
                actions: [
                    {
                        icon: 'link',
                        action: function (li, inst) {
                            notify('Linked');
                        }
                    },
                    {
                        icon: 'star3',
                        action: function (li, inst) {
                            notify('Starred');
                        }
                    },
                    {
                        icon: 'download',
                        action: function (li, inst) {
                            notify('Downloaded');
                        }
                    },
                    {
                        icon: 'print',
                        action: function (li, inst) {
                            notify('Printing...');
                        }
                    },
                    {
                        icon: 'remove',
                        undo: true,
                        action: function (li, inst) {
                            inst.remove(li);
                            return false;
                        }
                    }
                ]
            }
        }
    };

    var notification = $('<div class="demo-notification"><div class="demo-notification-i"></div></div>').appendTo('body'),
        notificationTimer;

    function notify(text) {

        clearTimeout(notificationTimer);
        
        notification.show().find('.demo-notification-i').html(text);

        if (notification.hasClass('demo-notification-v')) {
            notification.removeClass('demo-notification-v');
            notificationTimer = setTimeout(function () {
                notification.addClass('demo-notification-v');
            }, 200);
        } else {
            notification.addClass('demo-notification-v');
        }
 
        notificationTimer = setTimeout(function () { 
            notification.removeClass('demo-notification-v'); 
            notificationTimer = setTimeout(function () {
               notification.hide();
            }, 200);
        }, 2000);
    }

        }]);