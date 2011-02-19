{"poi":[
<?php

$xml = new SimpleXMLElement(file_get_contents('http://maps.google.co.uk/maps/ms?hl=en&gl=uk&ie=UTF8&msa=0&output=georss&msid=217165171259177697185.000476fc62bea67b9c50d'));

$items = array();

foreach($xml->channel->item as $item) {
  $items[] = $item;
}

foreach($items as $i1 => $item) :

?>
{
  'title': '<?php echo $item->title ?>',
  'description': '<?php echo $item->description ?>',
  'polygon': [
<?php $points = explode("\n", trim($item->children('http://www.opengis.net/gml')->Polygon->exterior->LinearRing->posList)) ?>
<?php foreach($points as $i2 => $point) : ?>
<?php list($lat, $lng) = explode(' ', trim($point)) ?>
    {'lat': <?php echo $lat ?>, 'lng': <?php echo $lng ?>}<?php if($i2+1 < count($points)) : ?>,<?php endif ?>

<?php endforeach ?>
  ]
}<?php if($i1+1 < count($items)) : ?>,<?php endif ?>

<?php endforeach ?>
]}