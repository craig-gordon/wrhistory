//H.Legend.prototype.getAllItems
(function (H) {

  H.wrap(H.Legend.prototype, 'getAllItems', function (p) {

    let allItems = p.apply(this, Array.prototype.slice.call(arguments, 1));

    let allPoints = allItems[0].points;

    // console.log('value being returned:', allPoints ? allPoints : allItems);

    return allPoints || allItems;

  });

}(ReactHighcharts.Highcharts));

//H.Legend.prototype.renderItem
(function (H) {

  H.wrap(H.Legend.prototype, 'renderItem', function (p) {

    console.log('arguments:', arguments);

    p.apply(this, Array.prototype.slice.call(arguments, 1));
    
    if (arguments[1].data.length !== 1) {

    }

  });

}(ReactHighcharts.Highcharts));

//H.Series.prototype.setVisible
(function(H) {

  H.wrap(H.Series.prototype, 'setVisible', function(p) {

    console.log('this:', this);

    console.log('arguments:', arguments);

    p.apply(this, Array.prototype.slice.call(arguments, 1));

  });

}(ReactHighcharts.Highcharts));